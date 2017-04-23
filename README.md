# Babel Plugin for [tinytime](https://github.com/aweary/tinytime)

Automatically transform usage of tinytime that is not recommended to the optimal way of using it.

Transforms
```jsx
function Time({ date }) {
  return (
    <div>
      {tinytime('{h}:{mm}:{ss}{a}').render(date)}
    </div>
  )
}
```

to something in the effect of:

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

Reasoning behind why this is needed can be read here: https://github.com/aweary/tinytime#efficiency.

## Install

```
// Yarn
yarn add babel-plugin-tinytime --dev

// NPM
npm install babel-plugin-tinytime --save-dev
```

## Usage
###### .babelrc
```json
{
  "presets": ["es2015"],
  "plugins": ["tinytime"]
}
```
