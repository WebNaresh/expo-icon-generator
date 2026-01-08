import Link from "next/link";
import { ExternalLink, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CrossPromotionBanner() {
  return (
    <Card className="mb-8 border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-100 p-2">
              <QrCode className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Free QR Code Generator
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Create professional QR codes for your applications and marketing
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Our Product
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <p className="max-w-md text-sm text-gray-600">
            Generate custom QR codes with logos, colors, and advanced features.
            Perfect for linking to your mobile apps and websites.
          </p>
          <Button asChild variant="outline" className="ml-4">
            <Link
              href="https://www.freeqrcodegenerator.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <span>Try QR Generator</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
