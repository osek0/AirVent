import {
  Wind,
  Settings,
  Wrench,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Check,
  Star,
  Home,
  Zap,
  Shield,
  Volume2,
  Thermometer,
  Droplets,
  Sun,
  CloudRain,
  Building,
  Users,
  Clock,
  Award,
  Heart,
  Leaf,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Wind,
  Settings,
  Wrench,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Check,
  Star,
  Home,
  Zap,
  Shield,
  Volume2,
  Thermometer,
  Droplets,
  Sun,
  CloudRain,
  Building,
  Users,
  Clock,
  Award,
  Heart,
  Leaf,
};

export const iconNames = Object.keys(iconMap);

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Wind;
}
