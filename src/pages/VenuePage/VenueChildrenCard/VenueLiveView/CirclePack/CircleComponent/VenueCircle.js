import React from 'react';
import PropTypes from 'prop-types';
import { animated } from '@react-spring/web';
import {
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
} from '@chakra-ui/react';
import { t } from 'i18next';
import { Buildings } from 'phosphor-react';

const propTypes = {
  node: PropTypes.instanceOf(Object).isRequired,
  handleClicks: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  style: PropTypes.instanceOf(Object).isRequired,
};

const VenueCircle = ({ node, style, handleClicks }) => (
  <Popover isLazy trigger="hover" placement="top">
    <PopoverTrigger>
      <animated.circle
        key={node.id}
        cx={style.x}
        cy={style.y}
        r={style.radius}
        fill={node.data.details.color}
        stroke="black"
        strokeWidth="1px"
        opacity={style.opacity}
        onClick={handleClicks.onClick}
      />
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton alignContent="center" mt={1} />
        <PopoverHeader display="flex">
          <Buildings weight="fill" size={24} />
          <Text ml={2}>{node?.data?.name.split('/')[0]}</Text>
        </PopoverHeader>
        <PopoverBody>
          <Heading size="sm">
            {node.data.children.length} {t('devices.title')}
          </Heading>
          <Heading size="sm">
            {node.data.details.avgHealth}% {t('analytics.average_health')}
          </Heading>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  </Popover>
);

VenueCircle.propTypes = propTypes;
export default React.memo(VenueCircle);