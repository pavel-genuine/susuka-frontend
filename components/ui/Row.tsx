import Grid, { GridProps } from '@mui/material/Grid';
import { FC, PropsWithChildren } from 'react';

const Row: FC<PropsWithChildren<GridProps>> = ({
    item: _,
    rowSpacing = 2,
    columnSpacing = 2,
    children,
    ...rest
}) => {
    return (
        <Grid
            container
            rowSpacing={rowSpacing}
            columnSpacing={columnSpacing}
            {...rest}
        >
            {children}
        </Grid>
    );
};

export default Row;
