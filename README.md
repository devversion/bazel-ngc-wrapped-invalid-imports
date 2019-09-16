# bazel-ngc-wrapped-invalid-imports

Read more about the issue here: https://hackmd.io/MlqFp-yrSx-0mw4rD7dnQQ

### How to reproduce:

* `bazel build packages/material/snack-bar`
* Open `./bazel-bin/packages/material/snack-bar.js`
* See how NGC generated an import to `@angular/cdk/overlay/overlay`. This is
incorrect as the import should always refer to public name of the entry-point.