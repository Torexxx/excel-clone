import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './scss/style.scss';
import {Excel} from '@/components/excel/Excel';
import {Header} from './components/header/Header';
import {Formula} from './components/formula/Formula';
import {Toolbar} from './components/toolbar/Toolbar';
import {Table} from './components/table/Table';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],

});

excel.render();