import { Copyright, Login, Logout } from '@mui/icons-material';
import DataContext from './context/data.context';
import { ServiceContext } from './context/service.context';
import { NotificationContext } from './context/notification.context';
import EntityCrud from './ui/crud/entity.crud';
import EntityEdit from './ui/crud/entity.edit';
import EntityForm from './ui/crud/entity.form';
import EntityList from './ui/crud/entity.list';
import AdminChipField from './ui/field/admin-chip-field';
import AdminResourceSelectField from './ui/field/admin-resource-select-field';
import AdminSelectField from './ui/field/admin-select-field';
import AdminTextField from './ui/field/admin-text-field';
import AdminCheckboxField from './ui/field/admin-checkbox-field';
import ColorModeSwitch from './ui/color-mode-switch';
import ConfirmationDialog from './ui/confirmation-dialog';
import MiniDrawer from './ui/mini-drawer';
import ProfileMenu from './ui/profile-menu';
import NotificationSnackbar from './ui/notification-snackbar';
import AuthService from './service/auth.service';
import authHeader from './service/auth-header';
import DataService from './service/data.service';
import { capitalizeFirstLetter, toCapitalizedWords } from './util/string-functions';
import CrudApp from './crud.app';
import { ThemeContext } from './context/theme.context';

export {
  DataContext, ServiceContext, NotificationContext,
  EntityCrud, EntityEdit, EntityForm, EntityList,
  AdminChipField, AdminResourceSelectField, AdminSelectField, AdminTextField, AdminCheckboxField,
  ColorModeSwitch,
  ConfirmationDialog,
  Copyright,
  Login,
  Logout,
  MiniDrawer,
  ProfileMenu,
  NotificationSnackbar,
  AuthService, DataService,
  authHeader,
  capitalizeFirstLetter,
  toCapitalizedWords,
  ThemeContext,
  CrudApp,
};
