import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'panel>table-responsive>table>tbody>tr:nth-child(2n+1)': {
    'backgroundColor': '#CCC !important'
  },
  'panel>table-responsive>table>tbody>tr:nth-child(2n)': {
    'backgroundColor': '#FFF !important'
  },
  'detail': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  }
});
