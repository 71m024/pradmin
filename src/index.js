import DataContext from "./components/crud/data-context";
import DataServiceContext from "./components/crud/data-context";
import EntityCrud from "./components/crud/entity.crud";
import EntityEdit from "./components/crud/entity.edit";
import EntityForm from "./components/crud/entity.edit";
import EntityList from "./components/crud/entity.edit";
import AdminChipField from "./components/field/admin-chip-field";
import AdminResourceSelectField from "./components/field/admin-resource-select-field";
import AdminSelectField from "./components/field/admin-select-field";
import AdminTextField from "./components/field/admin-text-field";
import ColorModeSwitch from "./components/color-mode-switch";
import ConfirmationDialog from "./components/confirmation-dialog";
import {Copyright} from "@mui/icons-material";
import {Login} from "@mui/icons-material";
import {Logout} from "@mui/icons-material";
import MiniDrawer from "./components/mini-drawer";
import ProfileMenu from "./components/profile-menu";
import StatusSnackbar from "./components/status-snackbar";
import AuthService from "./service/auth.service";
import authHeader from "./service/auth-header";
import DataService from "./service/data.service";
import {capitalizeFirstLetter, toCapitalizedWords} from "./util/string-functions";
import {ColorModeContext} from "./CrudApp";
import ToggleColorMode from "./CrudApp";

export {
    DataContext, DataServiceContext,
    EntityCrud, EntityEdit, EntityForm, EntityList,
    AdminChipField, AdminResourceSelectField, AdminSelectField, AdminTextField,
    ColorModeSwitch,
    ConfirmationDialog,
    Copyright,
    Login,
    Logout,
    MiniDrawer,
    ProfileMenu,
    StatusSnackbar,
    AuthService, DataService,
    authHeader,
    capitalizeFirstLetter,
    toCapitalizedWords,
    ColorModeContext,
    ToggleColorMode
};