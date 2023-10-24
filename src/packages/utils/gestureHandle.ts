import { globalDrawer } from 'packages/uikit/components/Drawer';

const onSwipeRight = (gestureState) => {
    console.log(gestureState);
    globalDrawer.open();
};

export { onSwipeRight };
