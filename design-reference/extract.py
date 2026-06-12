#!/usr/bin/env python3
"""Walk Figma node JSON and print a compact, readable spec."""
import json, sys

def hexc(c, o=None):
    r, g, b = round(c["r"]*255), round(c["g"]*255), round(c["b"]*255)
    a = c.get("a", 1) if o is None else o
    if a >= 0.999:
        return f"#{r:02x}{g:02x}{b:02x}"
    return f"#{r:02x}{g:02x}{b:02x}/{a:.2f}"

def paint(p):
    t = p.get("type")
    if not p.get("visible", True):
        return None
    op = p.get("opacity", 1)
    if t == "SOLID":
        return hexc(p["color"], op if op < 0.999 else p["color"].get("a", 1))
    if t and t.startswith("GRADIENT"):
        stops = ",".join(f"{hexc(s['color'])}@{s['position']:.2f}" for s in p.get("gradientStops", []))
        return f"{t.lower()}({stops})"
    if t == "IMAGE":
        return f"img({p.get('imageRef','')[:12]}…,{p.get('scaleMode','')}{',op=%.2f'%op if op<0.999 else ''})"
    return t

def fmt(n, d=0, max_depth=99):
    ind = "  " * d
    t = n.get("type", "?")
    name = n.get("name", "")
    bb = n.get("absoluteBoundingBox") or {}
    parts = [f"{ind}{t} \"{name}\" [{bb.get('width',0):.0f}x{bb.get('height',0):.0f} @{bb.get('x',0):.0f},{bb.get('y',0):.0f}]"]
    lay = []
    if n.get("layoutMode"):
        lay.append(f"flex-{'row' if n['layoutMode']=='HORIZONTAL' else 'col'}")
        if n.get("itemSpacing"): lay.append(f"gap={n['itemSpacing']:g}")
        pads = [n.get(k, 0) for k in ("paddingTop","paddingRight","paddingBottom","paddingLeft")]
        if any(pads): lay.append("pad=" + "/".join(f"{p:g}" for p in pads))
        if n.get("primaryAxisAlignItems"): lay.append(f"main={n['primaryAxisAlignItems']}")
        if n.get("counterAxisAlignItems"): lay.append(f"cross={n['counterAxisAlignItems']}")
    fills = [x for x in (paint(p) for p in n.get("fills", [])) if x]
    strokes = [x for x in (paint(p) for p in n.get("strokes", [])) if x]
    if fills: lay.append("fill=" + "|".join(fills))
    if strokes:
        lay.append("stroke=" + "|".join(strokes) + f" w={n.get('strokeWeight',1):g}")
    if n.get("cornerRadius"): lay.append(f"r={n['cornerRadius']:g}")
    if n.get("rectangleCornerRadii"): lay.append("r=" + "/".join(f"{x:g}" for x in n["rectangleCornerRadii"]))
    if n.get("opacity", 1) < 0.999: lay.append(f"op={n['opacity']:.2f}")
    for e in n.get("effects", []):
        if e.get("visible", True):
            etype = e["type"]
            if etype in ("DROP_SHADOW", "INNER_SHADOW"):
                off = e.get("offset", {})
                lay.append(f"{etype.lower()}({off.get('x',0):g},{off.get('y',0):g},{e.get('radius',0):g},{hexc(e['color'])})")
            elif etype.endswith("BLUR"):
                lay.append(f"{etype.lower()}({e.get('radius',0):g})")
    if t == "TEXT":
        s = n.get("style", {})
        lay.append(f"font={s.get('fontFamily')}/{s.get('fontWeight')}/{s.get('fontSize'):g}px")
        if s.get("lineHeightPx"): lay.append(f"lh={s['lineHeightPx']:g}")
        if s.get("letterSpacing"): lay.append(f"ls={s['letterSpacing']:.2f}")
        if s.get("textCase"): lay.append(f"case={s['textCase']}")
        if s.get("textAlignHorizontal") != "LEFT": lay.append(f"align={s.get('textAlignHorizontal')}")
    if n.get("componentId"): lay.append(f"comp={n['componentId']}")
    if not n.get("visible", True): lay.append("HIDDEN")
    if lay:
        parts.append("  {" + " ".join(lay) + "}")
    out = ["".join(parts)]
    if t == "TEXT":
        chars = n.get("characters", "").replace("\n", "\\n")
        out.append(f"{ind}  ▸ \"{chars}\"")
    if d < max_depth:
        for c in n.get("children", []):
            out.append(fmt(c, d+1, max_depth))
    return "\n".join(out)

if __name__ == "__main__":
    path, *rest = sys.argv[1:]
    max_depth = int(rest[0]) if rest else 99
    data = json.load(open(path))
    nodes = data.get("nodes", {})
    if nodes:
        for nid, wrap in nodes.items():
            print(fmt(wrap["document"], 0, max_depth))
            print()
    else:
        print(fmt(data.get("document", data), 0, max_depth))
