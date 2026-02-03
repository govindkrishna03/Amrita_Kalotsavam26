"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export const ThreeDMarquee = ({ images, className }: { images: string[]; className?: string }) => {
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, i) =>
    images.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  return (
  <div className={cn("relative h-full w-full overflow-hidden", className)}>
    {/* Increase scale and ensure it's centered */}
    <div className="absolute left-1/2 sm:left-[1150px] top-1/2 size-[1500px] -translate-x-1/2 -translate-y-1/2 scale-100 sm:scale-150">
      <div
        style={{ transform: "rotateX(55deg) rotateZ(-45deg)" }}
        className="grid size-full origin-center grid-cols-4 gap-12 transform-3d"
      >
          {chunks.map((subarray, colIndex) => (
            <motion.div
              key={colIndex}
              animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
              transition={{
                duration: colIndex % 2 === 0 ? 10 : 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="flex flex-col gap-8"
            >
              {subarray.map((image, imageIndex) => (
                <motion.img
                  key={imageIndex}
                  src={image}
                  alt=""
                  className="aspect-[970/700] rounded-lg object-cover ring ring-black/10"
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
