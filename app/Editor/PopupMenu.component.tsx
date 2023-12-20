import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
export enum Action {
    REWRITE = 'Rewrite',
    REPHRASE = 'Rephrase',
}

const navItems = Object?.values(Action);
console.log(navItems);

export default function PopupMenu({ handleClick, setAction }) {
    return (
        <div className="flex-container">
            <List
                disablePadding={true}
                sx={{ display: 'flex', width: 'fit-content' }}
            >
                {navItems?.map((nI, idx) => {
                    return (
                        <ListItem
                            key={idx}
                            disableGutters={true}
                            sx={{
                                width: 'fit-content',
                                background: 'rgb(242 242 242 / 90%)',
                            }}
                        >
                            <Button
                                onClick={() => {
                                    setAction(nI);
                                    handleClick();
                                }}
                            >
                                {nI}
                            </Button>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}
