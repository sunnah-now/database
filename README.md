# Sunnah.now Database

This directory contains Hadith data in JSON format and multiple groupings. These files are used to populate the Redis database for the sunnah.now API, but can also be used for offline use cases.

## Downloadable Dumps
For those looking for a single large JSON file containing the entire collection, please check the **GitHub Releases** for this repository. We provide single-file dumps for easier download and bulk usage.

## Contents

- `*.json`: Individual JSON files for different Hadith collections.
- `[hdaith]/`: Hierarchical folder structure where each Hadith has its own JSON file.

## Why the filesystem like structure?
The `[hdaith]/` directories are structured such that each individual Hadith is stored in its own JSON file. This design makes it significantly easier to:
1. Edit a specific Hadith directly on GitHub.
2. Submit a Pull Request for targeted fixes.
3. Maintain the collection without dealing with massive single-file diffs.

## Usage

When used alongside the API, you can load the data into Redis to power the sunnah.now API. The API expects the data in the specific format already provided in these JSON files.

From the monorepo root:
```bash
make load-data
```

## Contributing

If you find a misspelling, an error in translation, or anything that could be improved or fixed, your contributions are very welcome! Please feel free to open a Pull Request with the corrected JSON files.

## Maintenance

The Hadith dumps are actively updated. Ensure you use the latest versions to get the most accurate data.
