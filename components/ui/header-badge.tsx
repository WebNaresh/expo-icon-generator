import { Badge } from "./badge";

type Props = {
  badgeText: string;
  gradientText: string;
  normalText?: string;
  description: string;
};

const HeaderBadge = ({
  badgeText,
  gradientText,
  normalText,
  description,
}: Props) => {
  return (
    <div className="text-center mb-16 relative">
      <div className="flex flex-col items-center justify-center">
        <Badge className="rounded-full bg-primary text-white border border-border font-medium px-4 py-1 text-sm shadow-none tracking-normal">
          ✨ {badgeText}
        </Badge>

        <div className="relative inline-block">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 relative z-10">
            <span className="text-secondary ">{gradientText}</span>
            {normalText && <span> {normalText}</span>}
          </h2>
        </div>

        <p className="text-muted-foreground max-w-2xl mx-auto relative">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeaderBadge;
