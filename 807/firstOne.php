<?php
declare(strict_types=1);

// Rewrite: Button + color box demo
// - Default box color is white
// - Clicking the button asks PHP for a random color among 3 options

$api = $_GET['api'] ?? null;

$colors = [
    [
        'key' => 'salmon-red',
        'name' => 'Salmon Red',
        'hex' => '#FA8072', // salmon
    ],
    [
        'key' => 'bmw-isle-green',
        'name' => 'BMW Isle Green',
        'hex' => '#0A5C4F', // deep green (approximation)
    ],
    [
        'key' => 'cerulean-blue',
        'name' => 'Cerulean Blue',
        'hex' => '#2A52BE',
    ],
];

if ($api === 'color') {
    header('Content-Type: application/json');
    $choice = $colors[random_int(0, count($colors) - 1)];
    echo json_encode($choice, JSON_THROW_ON_ERROR);
    exit;
}

$title = 'PHP Random Color Box';
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></title>
    <style>
      :root { color-scheme: light dark; }
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 2rem; }
      .wrap { display: flex; align-items: center; gap: 1rem; }
      button { background: #2563eb; color: #fff; border: 0; padding: 0.6rem 1rem; border-radius: 8px; cursor: pointer; }
      button:disabled { opacity: 0.7; cursor: not-allowed; }
      .box { width: 140px; height: 70px; border: 2px solid #ccc; border-radius: 10px; background: #ffffff; display: grid; place-items: center; }
      .label { font-size: 0.9rem; }
      .muted { opacity: 0.8; margin-top: 1rem; }
    </style>
  </head>
  <body>
    <h1><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></h1>

    <div class="wrap">
      <button id="changeBtn" type="button">Change color</button>
      <div id="colorBox" class="box" role="status" aria-live="polite" aria-label="Color box">
        <span id="colorLabel" class="label">White (#FFFFFF)</span>
      </div>
    </div>

    <p class="muted">Default color is white. Clicking the button fetches a random color from PHP.</p>

    <script>
      const btn = document.getElementById('changeBtn');
      const box = document.getElementById('colorBox');
      const label = document.getElementById('colorLabel');

      btn.addEventListener('click', async () => {
        btn.disabled = true;
        try {
          const res = await fetch('?api=color', { headers: { 'Accept': 'application/json' }});
          if (!res.ok) throw new Error('HTTP ' + res.status);
          const data = await res.json(); // { key, name, hex }
          box.style.backgroundColor = data.hex;
          label.textContent = `${data.name} (${data.hex})`;
        } catch (err) {
          label.textContent = 'Failed to get color';
        } finally {
          btn.disabled = false;
        }
      });
    </script>
  </body>
</html>
