#!/usr/bin/env bash
# Rebuild the public CV from its editable source; requires a TeX Live installation.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
build_dir="$(mktemp -d "${TMPDIR:-/tmp}/puqi-cv.XXXXXX")"
trap 'rm -rf "$build_dir"' EXIT

for pass in 1 2; do
  if ! pdflatex -interaction=nonstopmode -halt-on-error \
    -output-directory="$build_dir" "$repo_root/docs/cv.tex" > "$build_dir/build.log" 2>&1; then
    cat "$build_dir/build.log" >&2
    exit 1
  fi
done

if grep -E 'Overfull|LaTeX Warning' "$build_dir/cv.log"; then
  echo "CV has layout or reference warnings; review the source before replacing the PDF." >&2
  exit 1
fi

cp "$build_dir/cv.pdf" "$repo_root/files/cv.pdf"
echo "Built files/cv.pdf from docs/cv.tex."
