import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // here you can put your own css to customize and override the theme
  // **
Rounded Portlets
**
  // .portlet {
	border-radius: 4px !important;
}

.portlet .portlet-title {
	border-radius: 4px 4px 0px 0px !important;
}

.portlet .portlet-body,
.portlet .portlet-body .form-actions  {
	border-radius: 0px 0px 4px 4px !important;
}
  // Change Quick Sidebar Width
  // .page-quick-sidebar-wrapper {
  right: -370px;
  width: 370px;
}

.page-quick-sidebar-open.page-quick-sidebar-push-content .page-sidebar-wrapper {
  margin-left: -370px;
}

.page-quick-sidebar-open.page-quick-sidebar-push-content .page-footer {
  margin-right: 370px;
  margin-left: -370px;
}

.page-sidebar-reversed.page-quick-sidebar-open.page-quick-sidebar-push-content .page-sidebar-wrapper {
  margin-right: 370px;
}

.page-quick-sidebar-open.page-quick-sidebar-push-content.page-quick-sidebar-full-height .page-header {
  margin-left: -370px;
}

.page-quick-sidebar-wrapper .page-quick-sidebar .page-quick-sidebar-list {
  width: 370px !important;
}

.page-quick-sidebar-wrapper .page-quick-sidebar .page-quick-sidebar-item {
  width: 370px !important;
  margin-left: 370px;
}

.page-quick-sidebar-wrapper .page-quick-sidebar .page-quick-sidebar-content-item-shown .page-quick-sidebar-list {
  margin-left: -370px;
}
  'title': {
    'color': '#FFFFFF',
    'fontWeight': '500',
    'fontSize': [{ 'unit': 'px', 'value': 14 }]
  },
  'title-center': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }]
  }
});
