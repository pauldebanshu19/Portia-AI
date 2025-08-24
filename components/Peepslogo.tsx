import { AvatarCircles } from "@/components/magicui/avatar-circles";

const avatars = [
  {
    imageUrl: "",
    profileUrl: "https://github.com/pauldebanshu19",
  }
];

export function AvatarCirclesDemo() {
  return <AvatarCircles numPeople={99} avatarUrls={avatars} />;
}
