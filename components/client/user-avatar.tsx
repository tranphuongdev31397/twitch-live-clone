import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva("", {
  variants: {
    sizes: {
      default: "h-5 w-5",
      small: "h-3 w-3",
    },
  },
  defaultVariants: {
    sizes: "default",
  },
});

export interface UserAvatarProps {}

export default function UserAvatar(props: UserAvatarProps) {
  return <div></div>;
}
