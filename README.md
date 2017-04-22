# Babel Plugin for [tinytime](https://github.com/aweary/tinytime)

## Purpose
Automatically transform tinytime convenience usage to the optimal way like so:

```jsx
function Time({ date }) {
  return (
    <div>
      {tinytime('{h}:{mm}:{ss}{a}').render(date)}
    </div>
  )
}
```

to:

```jsx
const template = tinytime('{h}:{mm}:{ss}{a}');
function Time({ date }) {
  return (
    <div>
      {template.render(date)}
    </div>
  )
}
```

## WIP
