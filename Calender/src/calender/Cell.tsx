import clsx from "clsx";

interface Props extends React.PropsWithChildren {
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  isEvent?: boolean;
}

const Cell: React.FC<Props> = ({
  onClick,
  className,
  children,
  isActive = false,
  isEvent = false,
}) => {
  return (
    <>
      <div
        onClick={isActive ? undefined : onClick}
        className={clsx(
          "h-12 flex items-center justify-center border-b border-r",
          { "text-white bg-blue-600": isActive },
          {
            "cursor-pointer hover:bg-gray-100 active:bg-gray-200":
              !isActive && onClick,
          },
          { "text-white bg-red-500": isEvent },
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Cell;
