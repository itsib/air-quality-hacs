from typing import Any


def distance(x1: float, y1: float, x2: float, y2: float) -> float:
    """Calculate the Euclidean distance between two points"""
    return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** (1 / 2)


def closest_points(points: list[dict[str, Any]], target: dict[str, float], k: int):
    """Function to calculate K the closest points."""
    pts = []
    n = len(points)
    d = []

    for i in range(n):
        d.append({
            "first": distance(points[i]['geom_x'], points[i]['geom_y'], target['longitude'], target['latitude']),
            "second": i
        })

    d = sorted(d, key=lambda l: l["first"])

    for i in range(k):
        pts.append(points[d[i]["second"]])

    return pts
