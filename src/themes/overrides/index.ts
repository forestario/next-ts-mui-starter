// material-ui
import { Theme } from '@mui/material/styles';

// third-party
import { merge } from 'lodash';

// project import
import Alert from './Alert';
import AlertTitle from './AlertTitle';
import Autocomplete from './Autocomplete';
import Button from './Button';
import ButtonBase from './ButtonBase';
import ButtonGroup from './ButtonGroup';
import CardContent from './CardContent';
import Checkbox from './Checkbox';
import Chip from './Chip';
import Dialog from './Dialog';
import DialogContentText from './DialogContentText';
import DialogTitle from './DialogTitle';
import IconButton from './IconButton';
import InputBase from './InputBase';
import InputLabel from './InputLabel';
import LinearProgress from './LinearProgress';
import Link from './Link';
import ListItemButton from './ListItemButton';
import LoadingButton from './LoadingButton';
import OutlinedInput from './OutlinedInput';
import Popover from './Popover';
import Radio from './Radio';
import Switch from './Switch';
import ToggleButton from './ToggleButton';
import Tooltip from './Tooltip';
import Typography from './Typography';

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Alert(theme),
    AlertTitle(),
    Autocomplete(),
    Button(theme),
    ButtonBase(),
    ButtonGroup(),
    CardContent(),
    Checkbox(theme),
    Chip(theme),
    Dialog(),
    DialogContentText(theme),
    DialogTitle(),
    IconButton(theme),
    InputBase(),
    InputLabel(theme),
    LinearProgress(),
    Link(),
    ListItemButton(theme),
    LoadingButton(),
    OutlinedInput(theme),
    Popover(theme),
    Radio(theme),
    Switch(theme),
    ToggleButton(theme),
    Tooltip(theme),
    Typography(),
  );
}
