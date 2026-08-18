import type { CSSProperties, ImgHTMLAttributes } from "react";

type AppImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  src: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
};

export default function AppImage({
  src,
  alt = "",
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  style,
  ...props
}: AppImageProps) {
  const fillStyle: CSSProperties | undefined = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
    : style;

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={fillStyle}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
