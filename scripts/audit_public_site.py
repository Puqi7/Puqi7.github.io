#!/usr/bin/env python3
"""Audit rendered content, metadata, filenames, and extractable PDF text before publishing.

Usage: python3 scripts/audit_public_site.py _site [--allow-direction-status]
Requires pdftotext or Ghostscript when the output contains PDFs.
"""

import argparse
import html
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile


PATTERNS = {
    "private project name": r"\b(?:MAGNET|RoboSearch|Remy)\b",
    "private submission venue": r"\b(?:CHI|HRI)[\s\-–]*2027\b",
    "review status": r"\b(?:under\s+review|submitted)\b",
    "previously exposed CV entry": r"Applying\s*Ground\s*Robot\s*Fleets\s*in\s*Urban\s*Search|2602\.04992",
}
TEXT_EXTENSIONS = {".html", ".xml", ".json", ".md", ".txt", ".bib", ".csv", ".yml", ".yaml"}


def pdf_text(path):
    if shutil.which("pdftotext"):
        return subprocess.check_output(["pdftotext", str(path), "-"], text=True)
    if shutil.which("gs"):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "text.txt"
            subprocess.run([
                "gs", "-q", "-dSAFER", "-dBATCH", "-dNOPAUSE", "-sDEVICE=txtwrite",
                "-sOutputFile=" + str(output), str(path),
            ], check=True, capture_output=True)
            return output.read_text(errors="replace")
    raise RuntimeError("Install pdftotext or Ghostscript to audit PDF contents; PDF checks cannot be skipped.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", nargs="?", default="_site")
    parser.add_argument("--allow-direction-status", action="store_true",
                        help="Allow only the owner-approved generic badges on the home/publications pages.")
    args = parser.parse_args()
    root = Path(args.root)
    if not (root / "index.html").exists():
        raise RuntimeError("Build the site before running the public-content audit.")
    findings = []
    checked = 0
    pdf_count = 0
    approved_badges = []
    for path in sorted(root.rglob("*")):
        if not path.is_file():
            continue
        relative = path.relative_to(root)
        if relative.parts[0] in {"local", "docs", "scripts", "tests", "_drafts"}:
            findings.append((relative, "private/development directory copied into site"))
        content = str(relative)
        if path.suffix.lower() in TEXT_EXTENSIONS:
            rendered = html.unescape(path.read_text(errors="replace"))
            # This exception does not apply to metadata, PDFs, feeds, other pages,
            # project names, or any other wording about review/submission status.
            if args.allow_direction_status and relative.as_posix() in {"index.html", "publications/index.html"}:
                badge = '<span class="direction-status">Under review</span>'
                count = rendered.count(badge)
                if count > 3:
                    findings.append((relative, "unexpected number of direction-status badges"))
                if count:
                    rendered = rendered.replace(badge, "")
                    approved_badges.append((relative, count))
            content += "\n" + rendered
            checked += 1
        elif path.suffix.lower() == ".pdf":
            content += "\n" + pdf_text(path)
            pdf_count += 1
        # Ignore CSS/icon glyph names and vendor JS internals; check all asset names.
        for label, pattern in PATTERNS.items():
            if re.search(pattern, content, re.I):
                findings.append((relative, label))
    if findings:
        for path, label in findings:
            print(f"FAIL {path}: {label}")
        return 1
    print(f"PASS: {checked} public text files, {pdf_count} PDFs, and all asset filenames; no identifying review material found.")
    for path, count in approved_badges:
        print(f"Allowed by owner: {count} generic direction-status badges in {path}.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (RuntimeError, subprocess.CalledProcessError) as error:
        print(f"Audit could not complete: {error}", file=sys.stderr)
        sys.exit(2)
