import Grid, { GridProps } from '@mui/material/Grid';
import { FC, PropsWithChildren } from 'react';

const Col: FC<PropsWithChildren<GridProps>> = ({
    container: _,
    children,
    ...rest
}) => {
    return (
        <Grid item {...rest}>
            {children}
        </Grid>
    );
};

export default Col;
