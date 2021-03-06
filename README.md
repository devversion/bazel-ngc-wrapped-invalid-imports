# bazel-ngc-wrapped-invalid-imports

Read more about the issue here: https://hackmd.io/MlqFp-yrSx-0mw4rD7dnQQ

### How to reproduce:

* `bazel build packages/material/snack-bar`
* Open `./bazel-bin/packages/material/snack-bar.js`
* See how NGC generated an import to `@angular/cdk/overlay/overlay`. This is
incorrect as the import should always refer to public name of the entry-point.


### How to reproduce the Bazel "generateCodeForLibaries" issue:

1. `yarn ngc -p test-vanilla-ngc/a/tsconfig.json`
2. `yarn ngc -p test-vanilla-ngc/b/tsconfig.json`.

Both of these compilations work. `b` properly builds
with metadata of `a`.

Now change in `test-vanilla-ngc/b/tsconfig.json` the
`generateCodeForLibraries` option and notice how
the metadata of `a` is discarded if you rebuild
`b`.

3. `yarn ngc -p test-vanilla-ngc/b/tsconfig.json`.