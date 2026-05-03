import React, { useEffect, useState } from 'react';
import { animated } from '@react-spring/web';
import { DraggableList } from '@jswork/react-draggable-list/src';
import type { DraggableItemContext } from '@jswork/react-draggable-list/src';

const INITIAL_ITEMS = [
  { id: 1, label: 'React', color: '#61dafb' },
  { id: 2, label: 'Vue', color: '#42b883' },
  { id: 3, label: 'Angular', color: '#dd1b16' },
  { id: 4, label: 'Svelte', color: '#ff3e00' },
  { id: 5, label: 'Solid', color: '#2c4f7c' },
  { id: 6, label: 'Ember', color: '#e04e39' },
];

const ITEM_HEIGHT = 64;
const ITEM_GAP = 8;

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  useEffect(() => {
    console.log('items: ', items);
  }, [items]);

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#333' }}>
        React Draggable List
      </h2>
      <DraggableList
        data={items}
        itemHeight={ITEM_HEIGHT}
        itemGap={ITEM_GAP}
        onChange={(newOrder) => setItems(newOrder)}
        slots={{
          item: (ctx: DraggableItemContext<(typeof INITIAL_ITEMS)[number]>) => (
            <animated.div
              {...ctx.dragProps}
              style={{
                ...ctx.style,
                position: 'absolute',
                width: '100%',
                height: ITEM_HEIGHT,
                touchAction: 'none',
                cursor: ctx.isDragging ? 'grabbing' : 'grab',
                borderRadius: 10,
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                boxShadow: ctx.isDragging
                  ? '0 8px 24px rgba(0,0,0,0.15)'
                  : '0 1px 3px rgba(0,0,0,0.08)',
                userSelect: 'none',
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: ctx.item.color,
                  marginRight: 12,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 15, fontWeight: 500, color: '#333' }}>
                {ctx.item.label}
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  color: '#bbb',
                  fontSize: 16,
                  letterSpacing: 2,
                }}
              >
                ⠿
              </span>
            </animated.div>
          ),
        }}
      />
      <p style={{ textAlign: 'center', marginTop: 20, color: '#999', fontSize: 13 }}>
        Drag items to reorder
      </p>
    </div>
  );
}

export default App;
