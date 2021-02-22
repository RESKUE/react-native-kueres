import React from 'react';
import SearchContext from './SearchContext';

export default function SearchProvider({
  children,
  onQueryUpdate = (query) => {},
}) {
  const [filters, setFilters] = React.useState({});
  const [sorters, setSorters] = React.useState({});
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    const query = buildQuery(filters, sorters);
    onQueryUpdate(query);
  }, [filters, sorters, onQueryUpdate]);

  const putState = React.useCallback(
    (key, value) => {
      const newState = {...state};
      newState[key] = value;
      setState(newState);
    },
    [state, setState],
  );

  const getState = React.useCallback(
    (key, fallback) => {
      return state[key] ?? fallback;
    },
    [state],
  );

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

  return (
    <SearchContext.Provider
      value={{putState, getState, updateFilters, updateSorters}}>
      {children}
    </SearchContext.Provider>
  );
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
