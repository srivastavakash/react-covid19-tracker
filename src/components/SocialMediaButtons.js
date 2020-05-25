import React from "react";
import styled from "styled-components";

import { ShareButtons } from "react-share";

const {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} = ShareButtons;

const SocialMediaButtons = props => (
  <div className="row animated animatedFadeInUp fadeInUp social-btns">
    <div className="col-md-4 col-sm-4 col-xs-4 social-btn">
      <FacebookShareButton url={props.url} quote={props.text}>
        <button className="btn btn-sm btn-facebook">
          <i class="fa fa-facebook" /> <span>Share</span>
        </button>
      </FacebookShareButton>
    </div>
    <div className="col-md-4 col-sm-4 col-xs-4 social-btn">
      <TwitterShareButton url={props.url} title={props.text}>
        <button className="btn btn-sm twt-btn">
          <i class="fa fa-twitter-square" /> <span>Tweet</span>
        </button>
      </TwitterShareButton>
    </div>
    <div className="col-md-4 col-sm-4 col-xs-4 social-btn">
      <WhatsappShareButton url={props.url} title={props.text}>
        <button className="btn btn-sm whtsp-btn">
          <i class="fab fa-whatsapp" /> <span>Share</span>
        </button>
      </WhatsappShareButton>
    </div>
  </div>
);

export default SocialMediaButtons;
