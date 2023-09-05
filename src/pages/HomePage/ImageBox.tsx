import React from "react";
import { LikeHoverIcon } from "../../icons/LikeHoverIcon";
import { LikeIcon } from "../../icons/LikeIcon";
import { UnlikeIcon } from "../../icons/UnlikeIcon";
import { CommentIcon } from "../../icons/CommentIcon";
import { SharePostIcon } from "../../icons/SharePostIcon";
import { SharePostHoverIcon } from "../../icons/SharePostHoverIcon";
import { SaveIcon } from "../../icons/SaveIcon";
import { SaveHoverIcon } from "../../icons/SaveHoverIcon";

const ImageBox = () => {
  return (
    <div>
      <LikeHoverIcon />
      <LikeIcon />
      <UnlikeIcon />
      <CommentIcon />
<SaveIcon/>
<SaveHoverIcon/>
      <SharePostIcon />
      <SharePostHoverIcon />
    </div>
  );
};

export default ImageBox;
