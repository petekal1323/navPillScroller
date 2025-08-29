# navPillScroller

A lightweight controller for a horizontally scrollable “pill” nav. It keeps the counter in sync whether you click tabs or drag/scroll, and auto centers the active pill while preventing edge clipping. It uses an `IntersectionObserver` to detect the pill nearest the scroller’s center during user scrolls, and recenters smoothly on init, tab changes, arrows, and resizes.

## Markup structure
The script expects these hooks (classes/IDs). Each pill wrapper needs a `data-order` starting at 1.

```html
<div class="nav-outcomes">
  <button class="out-left btn" type="button" aria-label="Previous">‹</button>

  <div id="pills-out-tab">
    <div class="out-item" data-order="1">
      <a class="nav-link active" href="#pane-1">Overview</a>
    </div>
    <div class="out-item" data-order="2">
      <a class="nav-link" href="#pane-2">Details</a>
    </div>
    <!-- …more .out-item with data-order="3", "4", etc. -->
  </div>

  <button class="out-right btn" type="button" aria-label="Next">›</button>

  <div class="counter">
    <span class="out-current">1</span>/<span class="out-total">2</span>
  </div>
</div>



<!-- include jQuery and the script 
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
<script src="./pillscroller.js"></script>
-->
