import React from 'react';

export default function useQuery() {
  const [filters, setFilters] = React.useState({});
  const [sorters, setSorters] = React.useState({});
  const [query, setQuery] = React.useState(null);

  React.useEffect(() => {
    const newQuery = buildQuery(filters, sorters);
    setQuery(newQuery);
  }, [filters, sorters, setQuery]);

  const updateFilters = React.useCallback(
    (field, operation, value) => {
      const updatedFilters = {...filters};
      updatedFilters[field] = {
        operation: operation,
        value: value,
      };
      setFilters(updatedFilters);
    },
    [filters, setFilters],
  );

  const updateSorters = React.useCallback(
    (field, ordering) => {
      const updatedSorters = {...sorters};
      updatedSorters[field] = ordering;
      setSorters(updatedSorters);
    },
    [sorters, setSorters],
  );

  return {query, updateFilters, updateSorters};
}

export function buildFilterParameter(field, operation, value) {
  if (value === null) {
    return null;
  }
  return `filter=${field}${operation}${value}`;
}

export function buildFilterParameters(filters) {
  const parameters = [];
  for (const [field, {operation, value: rawValue}] of Object.entries(filters)) {
    const valueList = Array.isArray(rawValue) ? rawValue : [rawValue];
    valueList.forEach((value) => {
      const parameter = buildFilterParameter(field, operation, value);
      if (parameter !== null) {
        parameters.push(parameter);
      }
    });
  }
  return parameters;
}

export function buildSortParameter(field, ordering) {
  if (ordering === null) {
    return null;
  }
  return `sort=${field};${ordering}`;
}

export function buildSortParameters(sorters) {
  const parameters = [];
  for (const [field, ordering] of Object.entries(sorters)) {
    const parameter = buildSortParameter(field, ordering);
    if (parameter !== null) {
      parameters.push(parameter);
    }
  }
  return parameters;
}

export function buildQuery(filters, sorters) {
  const filterParameters = buildFilterParameters(filters);
  const sortParameters = buildSortParameters(sorters);
  const parameters = [...filterParameters, ...sortParameters];
  return parameters.join('&');
}
