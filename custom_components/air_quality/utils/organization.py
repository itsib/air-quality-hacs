from typing import Any

class Organization:
    """
    Description of the organization that owns the weather station.

    Attributes:
        id: Organization ID from API https://air.krasn.ru/api/2.0/projects
        name: Organization name
        description: A brief description of the organization and what it does
        short_name: The organization's code. Used in returned objects.
        owner_name: Legal name of the organization
        owner_url: Website of the organization.
    """
    id: str
    name: str
    description: str
    short_name: str
    owner_name: str
    owner_url: str

    def __init__(self, project: dict[str, Any]):
        _owner: dict[str, str] = project.get('owner')
        self.id = str(project.get('id'))
        self.name = project.get('name')
        self.description = project.get('description')
        self.short_name = project.get('short_name')
        self.owner_name = _owner.get('name')
        self.owner_url = _owner.get('url')