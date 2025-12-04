import { useState, useEffect, ImgHTMLAttributes, memo, useMemo, useCallback } from 'react';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

const Image = memo(function Image({ 
  src, 
  alt, 
  fill = false, 
  sizes, 
  priority = false,
  className = '',
  ...props 
}: ImageProps) {
  const [error, setError] = useState(false);

  // Preload image if priority
  useEffect(() => {
    if (priority && src) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        // Image loaded successfully
      };
      img.onerror = () => {
        setError(true);
        if (process.env.NODE_ENV === 'development') {
          console.error(`Failed to load image: ${src}`);
        }
      };
    }
  }, [src, priority]);

  const handleError = useCallback(() => {
    setError(true);
    if (process.env.NODE_ENV === 'development') {
      console.error(`Image failed to load: ${src}`);
    }
  }, [src]);

  const handleLoad = useCallback(() => {
    // Image loaded successfully
  }, []);

  const imageProps = useMemo(() => ({
    src,
    alt,
    className: fill ? `object-cover w-full h-full ${className}` : className,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    onLoad: handleLoad,
    onError: handleError,
    ...props,
  }), [src, alt, fill, className, priority, handleLoad, handleError, props]);

  if (fill) {
    return (
      <div className="absolute inset-0">
        {error ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">Image not found</span>
          </div>
        ) : (
          <img {...imageProps} />
        )}
      </div>
    );
  }

  return (
    <>
      {error ? (
        <div className={`bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center ${className}`}>
          <span className="text-xs text-gray-500 dark:text-gray-400">Image not found</span>
        </div>
      ) : (
        <img {...imageProps} />
      )}
    </>
  );
});

Image.displayName = 'Image';

export default Image;
