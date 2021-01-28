import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { CalloutCard } from "component/cards/CalloutCard";

import { sendEvt } from "services/event.service";

import libraryIcon from "./library.png";
import imgFallback from "./resource_fallback.png";

import { getResources } from "services/resources.service";

import styles from "./ResourcesCard.module.scss";

const ResourcesCard = (userId) => {
  const [resources, setResources] = useState([]);
  const [primaryResource, setPrimaryResource] = useState(none);
  const [secondaryResources, setSecondaryResources] = useState([]);

  var sendEventTracking = function (resourceUuid) {
    const evt = new Object();
    evt = {
      event_name: "web_dashboard_card_" + r.id + "_" + r.title + "_tap"
    };
    sendEvt(evt);
    console.log("sending event");
  };

  // Fetch resources
  useEffect(async () => {
    const req = await getResources(userId);
    setResources(req.resources);
    let primaryResource = resources[0];
    let secondaryResources = resources.slice(1, 5);
    setPrimaryResource(primaryResource);
    setSecondaryResources(secondaryResources);
  });

  // Get image of first resource
  const i = () => {
    const { image } = primaryResource;
    if (!primaryResource.image || primaryResource.image === undefined) {
      return imgFallback;
    }

    if (image === true) {
      return image;
    }
  };

  return (
    <div className={styles.ResourcesCard}>
      <div className="content">
        <h1 className="serif">{props.title}</h1>

        <div className="resources-container">
          <div className="resource main-resource">
            <a
              href={primaryResource.url}
              onClick={sendEventTracking(primaryResource)}
              autofocus
            >
              <div className="thumbnail">
                <img src={i} alt="primary resource image" />
              </div>
            </a>

            <span className="topic">{primaryResource.group}</span>
            <a
              href={primaryResource.url}
              onClick={sendEventTracking(primaryResource.uuid)}
              className="resource-title serif"
            >
              <h1>{primaryResource.title}</h1>
            </a>
          </div>

          <div class="secondary-resources">
            {secondaryResources.map((resource, index) => (
              <div key={index} className="resource">
                <div className="resource-content">
                  <span className="topic">{resource.group}</span>
                  <a
                    href={resource.url}
                    onClick={sendEventTracking(resource.uuid)}
                    className="resource-title"
                  >
                    <br />
                    <h1 style="color:blue;">{resource.title}</h1>
                  </a>
                </div>

                <a
                  href={resource.url}
                  onClick={sendEventTracking(resource.uuid)}
                >
                  <div className="thumbnail">
                    <img
                      src={
                        !resource.icon || resource.icon == "None"
                          ? imgFallback
                          : resource.icon
                      }
                      alt="article thumbnail"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CalloutCard
        {...props}
        style="condensed"
        body={props.footer_body}
        cta={{
          text: "Explore the library",
          url: "/library"
        }}
        icon={libraryIcon}
      />
    </div>
  );
};

ResourcesCard.propTypes = {
  footer_body: PropTypes.string.isRequired,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ResourcesCard;
