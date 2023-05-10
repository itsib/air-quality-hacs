"""Update the manifest file."""
import sys
import json


def update_manifest():
    """Update the manifest file."""
    manifest_file_url = "custom_components/air_quality/manifest.json"
    version = "0.0.0"
    for index, value in enumerate(sys.argv):
        if value in ["--version", "-V"]:
            version = sys.argv[index + 1]

    with open(manifest_file_url, 'r') as manifest_file:
        manifest = json.load(manifest_file)

    manifest["version"] = version

    with open(manifest_file_url, "w") as manifest_file:
        manifest_file.write(json.dumps(manifest, indent=4, sort_keys=True))


update_manifest()
