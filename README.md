FileSlicer
-----

A test of using Blob.slice() on files, to check memory use.

Calculates the SHA-256 hash of each slice
(but not the hash of the whole file, as the SubtleCrypto API doesn't support progressive calculation).
