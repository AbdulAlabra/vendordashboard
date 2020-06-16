import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
export default function CustomDrawingManagerControl(
    { position = window.google.maps.ControlPosition.TOP_LEFT, children },
    context
) {
    const map = context[MAP];

    const controlDiv = document.createElement('div');

    useEffect(() => {
        const controls = map.controls[position];
        const index = controls.length;
        controls.push(controlDiv);
        return () => {
            controls.removeAt(index);
        };
    });

    return createPortal(
        <div style={{ marginRight: -5, }}>{children}</div>,
        controlDiv
    );
}

CustomDrawingManagerControl.contextTypes = {
    [MAP]: PropTypes.object,
};