workspace(name = "bazel_repro")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Add NodeJS rules (explicitly used for sass bundle rules)
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "3356c6b767403392bab018ce91625f6d15ff8f11c6d772dc84bc9cada01c669a",
    # Note that we cannot update to rules_nodejs#0.36.2 as it contains a bug where
    # node output binaries cannot be launched on windows. We can update once the
    # fix is released: https://github.com/bazelbuild/rules_nodejs/pull/1104.
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.36.1/rules_nodejs-0.36.1.tar.gz"],
)

load("@build_bazel_rules_nodejs//:defs.bzl", "check_bazel_version", "node_repositories", "yarn_install")


# The minimum bazel version to use with this repo is 0.27.0
check_bazel_version("0.27.0")

node_repositories(
  # For deterministic builds, specify explicit NodeJS and Yarn versions.
  node_version = "10.16.0",
    yarn_repositories = {
        "1.17.3": ("yarn-v1.17.3.tar.gz", "yarn-v1.17.3", "e3835194409f1b3afa1c62ca82f561f1c29d26580c9e220c36866317e043c6f3"),
    },
    yarn_version = "1.17.3",
)

yarn_install(
  name = "npm",
  package_json = "//:package.json",
  # Ensure that the script is available when running `postinstall` in the Bazel sandbox.
  data = [
    "//:angular-tsconfig.json",
  ],
  symlink_node_modules = False,
  yarn_lock = "//:yarn.lock",
)

# Install all bazel dependencies of the @ngdeps npm packages
load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")
install_bazel_dependencies()

# Setup TypeScript Bazel workspace
load("@npm_bazel_typescript//:defs.bzl", "ts_setup_workspace")
ts_setup_workspace()

# Fetch transitive dependencies which are needed to use the karma rules.
load("@npm_bazel_karma//:package.bzl", "rules_karma_dependencies")
rules_karma_dependencies()