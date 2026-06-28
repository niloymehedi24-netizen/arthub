import { Button } from "@heroui/react";

const DashboardHeading = ({
  title,
  subtitle,
  buttonText,
  buttonIcon,
  onButtonClick,
}) => {
  const Icon = buttonIcon;

  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-default-200 p-5 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-3xl font-black text-foreground">{title}</h1>

        {subtitle && (
          <p className="mt-2 text-sm text-default-500">{subtitle}</p>
        )}
      </div>

      {buttonText && (
        <Button
          onPress={onButtonClick}
          className="bg-linear-to-r from-fuchsia-500 to-cyan-400 font-bold text-white shadow-lg shadow-fuchsia-500/20"
          startContent={Icon ? <Icon className="h-4 w-4" /> : null}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default DashboardHeading;
