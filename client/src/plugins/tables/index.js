import Vue from 'vue';
import Table from './Table.vue';
import resolvePath from 'object-resolve-path';

const resolveRow = (item, fields, options) => {
  let row = { ...options };
  row.id = item._id;
  if (row.active) {
    row.active = row.active.value === item[row.active.name];
  }
  row['columns'] = {};
  fields.forEach((el) => {
    const attrs = Object.keys({ ...el.attrs }).length
      ? { ...el.attrs }
      : undefined;
    const field = {
      ...el,
      sortable: typeof el.sortable !== 'undefined' ? el.sortable : true,
      filterable: typeof el.filterable !== 'undefined' ? el.filterable : true,
    };
    if (field.hidden) {
      field.sortable = false;
      field.filterable = false;
    }
    if (field.tag === 'img') {
      attrs.src = item[field.attrs.src];
      field.sortable = false;
      field.filterable = false;
    }
    if (field.tag === 'router-link') {
      attrs.to = field.attrs.to.replace(':param', item[field.param]);
    }
    if (field.boolQuery) {
      field.boolQuery = eval(field.boolQuery);
    }
    row.columns[field.name] = {
      value: resolveValue(item, field),
      source: resolveValue(item, field, false),
      ...field,
      attrs,
    };
  });
  return row;
};

const resolveValue = (item, field, resolve = true) => {
  const resolvedValue = field.name
    ? resolvePath(item, field.name)
    : field.value;
  if (!resolve) {
    return resolvedValue;
  }
  if (field.format) {
    if (field.format.function) {
      return field.format.function(
        Date.parse(resolvedValue),
        field.format.pattern
      );
    }
    if (field.format.filter) {
      return Vue.filter(field.format.filter)(resolvedValue);
    }
  }
  if (field.concat) {
    return field.concat.names
      .map((key, index) => {
        if (field.concat.filters) {
          return Vue.filter(field.concat.filters[index])(
            resolvePath(item, key)
          );
        }
        return resolvePath(item, key);
      })
      .join(field.concat.join);
  }
  return resolvedValue;
};

const TableMixin = {
  methods: {
    mapTable(data, fields, options = {}) {
      let rows = [];
      data.forEach((item) => {
        const row = resolveRow(item, fields, options);
        rows.push(row);
      });
      return rows;
    },
    paginateTable(rows, options) {
      const { currentPage, perPage } = options;
      const offset = (currentPage - 1) * perPage;
      return [...rows].slice(offset).slice(0, perPage);
    },
    sortTable(rows, options) {
      const { orderBy, sort } = options;
      return [...rows].sort((a, b) => {
        const aCol = a.columns[orderBy];
        const bCol = b.columns[orderBy];
        const aVal = aCol.type !== 'number' ? aCol.value : aCol.source;
        const bVal = bCol.type !== 'number' ? bCol.value : bCol.source;
        if (aVal === bVal) {
          return 0;
        } else if (aVal === null || typeof aVal === 'undefined') {
          return 1;
        } else if (bVal === null || typeof bVal === 'undefined') {
          return -1;
        } else if (sort === 'asc') {
          return aVal < bVal ? 1 : -1;
        } else {
          return aVal > bVal ? 1 : -1;
        }
      });
    },
    searchTable(rows, search) {
      return [...rows].filter((item) => {
        return (
          Object.values(item.columns).filter((column) => {
            if (!column.filterable) {
              return 0;
            }
            return String(column.value).toLowerCase().indexOf(search) !== -1;
          }).length > 0
        );
      });
    },
  },
};

Vue.component('Table', Table);

Vue.mixin(TableMixin);
