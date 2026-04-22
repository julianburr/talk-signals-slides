/* eslint-disable max-lines */
import classNames from 'classnames';
import { match, P } from 'ts-pattern';

import PullImprovedSvg from '~/assets/illustrations/flow-charts/pull-improved.svg?react';
import PullSpaSvg from '~/assets/illustrations/flow-charts/pull-spa.svg?react';
import PullSvg from '~/assets/illustrations/flow-charts/pull.svg?react';
import PushSpaSvg from '~/assets/illustrations/flow-charts/push-spa.svg?react';
import PushSvg from '~/assets/illustrations/flow-charts/push.svg?react';
import { CodeEditorAlt } from '~/components/code-editor-alt';
import { formatCode } from '~/utils/code';

type Props = {
  step: number;
};

export function CodeHistorySlide({ step }: Props) {
  const title = match(step)
    .with(P.number.between(0, 2), () => '1995 — HTML')
    .with(P.number.between(3, 4), () => '2006 — jQuery and AJAX')
    .with(P.number.between(5, 6), () => '2006 — jQuery')
    .with(7, () => '2010 — Knockout')
    .with(8, () => '2014 — Vue')
    .with(P.number.between(9, 10), () => '2016 — Svelte')
    .with(P.number.between(11, 12), () => '2019 — Solid')
    .with(13, () => '2013 — React')
    .otherwise(() => null);

  const subtitle = match(step)
    .with(P.number.between(0, 2), () => '& server side, e.g. PHP')
    .with(10, () => 'since runes were introduced in 2019')
    .otherwise(() => null);

  const language = match(step)
    .with(P.number.between(0, 2), () => 'php' as const)
    .with(P.number.between(3, 7), () => 'html' as const)
    .with(8, () => 'html' as const) // vue
    .with(P.number.between(9, 10), () => 'html' as const) // svelte
    .otherwise(() => 'javascript' as const);

  const code = match(step)
    .with(
      P.number.between(0, 2),
      () => `
        <?php
          $counter = $_GET["counter"];
        ?>

        <html>
        <body>
          <a href="?counter=<?php echo $counter + 1; ?>">👍</a>
          <a href="?counter=<?php echo $counter - 1; ?>">👎</a>
          <p>Counter: <?php echo $counter; ?></p>
          <p>Parity: <?php echo $counter % 2 ? "odd" : "even"; ?></p>
        </body>
        </html>
      `,
    )
    .with(
      P.number.between(3, 4),
      () => `
        <button id="increase">👍</button>
        <button id="decrease">👎</button>
        <div id="content" data-count="0">
          <p>Counter: 0</p>
          <p>Parity: even</p>
        </div>

        <script>
          function update (val) {
            $content.attr("data-count", val);
            $.ajax(serverUrl, { val }).done((html) => {
              $content.html(html);
            });
          }
          $increase.click(() => update($content.attr("data-count") - 1));
          $decrease.click(() => update($content.attr("data-count") + 1));
        </script>
    `,
    )
    .with(
      P.number.between(5, 6),
      () => `
        <button id="increase">👍</button>
        <button id="decrease">👎</button>
        <div id="content" data-count="0">
          <p>Counter: <span id="counter"></span></p>
          <p>Parity: <span id="parity"></span></p>
        </div>

        <script>
          function update (val) {
            const parity = val % 2 ? "odd" : "even";
            $content.attr("data-count", val);
            $counter.text(val);
            $parity.text(parity);
          }
          $increase.click(() => update($content.attr("data-count") - 1));
          $decrease.click(() => update($content.attr("data-count") + 1));
        </script>
      `,
    )
    .with(
      7,
      () => `
        <button data-bind="click: increase">👍</button>
        <button data-bind="click: decrease">👎</button>
        <p>Counter: <span data-bind="text: counter"></span></p>
        <p>Parity: <span data-bind="text: parity"></span></p>

        <script>
          function ViewModel () {
            this.counter = ko.observable(0);
            this.parity = ko.computed(() => 
              this.counter() % 2 ? "odd" : "even");
            this.decrease = () => this.counter(this.counter() - 1);
            this.increase = () => this.counter(this.counter() + 1);
          }
          ko.applyBindings(new ViewModel(), document.body);
        </script>
      `,
    )
    .with(
      8,
      () => `
        <button v-on:click="count++">👍</button>
        <button v-on:click="count--">👎</button>
        <p>Counter: {{ counter }}</p>
        <p>Parity: {{ parity }}</p>

        <script>
          var vm = new Vue({
            data: {
              counter: 0
            },
            computed: {
              parity: () => this.counter % 2 ? "odd" : "even"
            }
          });
        </script>
      `,
    )
    .with(
      9,
      () => `
        <button on:click={increase}>👍</button>
        <button on:click={decrease}>👎</button>
        <p>Counter: {counter}</p>
        <p>Parity: {parity}</p>

        <script>
          let counter = 0;
          let parity = counter % 2 ? "odd" : "even";

          const decrease = () => {
            counter--;
          };
          const increase = () => {
            counter++;
          };
        </script>
      `,
    )
    .with(
      10,
      () => `
        <button on:click={increase}>👍</button>
        <button on:click={decrease}>👎</button>
        <p>Counter: {counter}</p>
        <p>Parity: {parity}</p>

        <script>
          let counter = $state(0);
          let parity = $derived(counter % 2 ? "odd" : "even");

          const decrease = () => {
            counter--;
          };
          const increase = () => {
            counter++;
          };
        </script>
      `,
    )
    .with(
      P.number.between(11, 12),
      () => `
        function App () {
          const [counter, setCounter] = createSignal(0);
          const decrease = () => setCounter(counter() - 1)
          const increase = () => setCounter(counter() + 1)

          const parity = createComputed(() =>
            counter() % 2 ? "odd" : "even");
        
          return (
            <>
              <button onClick={increase}>👍</button>
              <button onClick={decrease}>👎</button>
              <p>Counter: {counter}</p>
              <p>Parity: {parity}</p>
            </>
          );
        }
      `,
    )
    .with(
      13,
      () => `
        function App () {
          const [counter, setCounter] = useState(0);
          const decrease = () => setCounter(counter - 1);
          const increase = () => setCounter(counter + 1);

          const parity = useMemo(() => counter % 2 ? "odd" : "even");

          return (
            <>
              <button onClick={decrement}>👎</button>
              <button onClick={increment}>👍</button>
              <p>Counter: {counter}</p>
              <p>Parity: {parity}</p>
            </>
          );
        }
      `,
    )
    .otherwise(() => '');

  const mvc = match(step)
    .with(P.number.between(1, 2), () => (
      <div className="flex flex-col pt-[5vh] relative self-start">
        <span
          className={classNames(
            'font-heading uppercase font-bold text-[4vh] leading-[1.2] pl-[4.4vw]',
            { 'opacity-0': step === 1 },
          )}
        >
          &quot;Pull&quot;
        </span>
        <PullSvg className="w-[20vw] h-auto" />

        <p className="font-handwriting text-[2.8vh] leading-[1.2] text-center absolute -right-[8vw] top-[calc(100%-5vh)] w-[15vw]">
          Request new DOM based on changed state from the server
        </p>
      </div>
    ))
    .with(4, () => (
      <div className="flex flex-col pt-[2vh] relative self-start">
        <span className="font-heading uppercase font-bold text-[4vh] leading-[1.2] flex flex-col items-center w-[16vw]">
          <span>Improved</span>
          <span>&quot;Pull&quot;</span>
        </span>
        <PullImprovedSvg className="w-[28vw] h-auto" />

        <p className="font-handwriting text-[2.8vh] leading-[1.2] text-center absolute -right-0 top-[calc(100%-5vh)] w-[15vw]">
          Request new DOM from the server, specifically for certain parts of the interface
        </p>
      </div>
    ))
    .with(6, () => (
      <div className="flex flex-col pt-[5vh] relative self-start">
        <span className="font-heading uppercase font-bold text-[4vh] leading-[1.2] pl-[4.6vw]">
          &quot;Push&quot;
        </span>
        <PushSvg className="w-[20vw] h-auto ml-[1vw]" />

        <p className="font-handwriting text-[2.8vh] leading-[1.2] text-center absolute -right-[8vw] top-[calc(100%-5vh)] w-[15vw]">
          Directly mutate the DOM specifically where needed
        </p>
      </div>
    ))
    .with(P.number.between(7, 11), () => (
      <div className="flex flex-col pt-[5vh] relative self-start">
        <span className="font-heading uppercase font-bold text-[4vh] leading-[1.2] pl-[4.6vw]">
          &quot;Push&quot;
        </span>
        <PushSpaSvg className="w-[20vw] h-auto ml-[1vw]" />

        <p className="font-handwriting text-[2.8vh] leading-[1.2] text-center absolute -right-[8vw] top-[calc(100%-5vh)] w-[15vw]">
          Directly mutate the DOM specifically where needed
        </p>
      </div>
    ))
    .with(12, () => (
      <div className="flex flex-col pt-[5vh] relative self-start">
        <span className="font-heading uppercase font-bold text-[4vh] leading-[1.2] pl-[4.6vw]">
          <span>&quot;Push&quot;</span>
        </span>
        <span className="absolute left-[14vw] top-[5.4vh] whitespace-nowrap font-handwriting font-bold text-[3.8vh] leading-[1.2]">
          - then pull
        </span>
        <PushSpaSvg className="w-[20vw] h-auto ml-[1vw]" />

        <p className="font-handwriting text-[2.8vh] leading-[1.2] text-center absolute -right-[8vw] top-[calc(100%-5vh)] w-[15vw]">
          Directly mutate the DOM specifically where needed
        </p>
      </div>
    ))
    .with(13, () => (
      <div className="flex flex-col pt-[5vh] relative self-start">
        <span className="font-heading uppercase font-bold text-[4vh] leading-[1.2] pl-[4.4vw]">
          &quot;Pull&quot;
        </span>
        <PullSpaSvg className="w-[20vw] h-auto" />

        <p className="font-handwriting text-[2.8vh] leading-[1.2] text-center absolute -right-[8vw] top-[calc(100%-5vh)] w-[15vw]">
          Any change in state triggers a rerender of the subtree
        </p>
      </div>
    ))
    .otherwise(() => null);

  return (
    <div className="flex flex-1 w-full h-full flex-col p-[7vh] py-[4vh]">
      <div className="flex flex-row items-center gap-[4vh] p-[1vh]">
        {title && <h1 className="font-heading font-bold text-[6vh] leading-[1.2]">{title}</h1>}
        {subtitle && <span className="font-handwriting text-[5vh] leading-[1.2]">{subtitle}</span>}
      </div>
      <div className="flex flex-row flex-1 gap-[2vh]">
        <div className="flex flex-1">
          <CodeEditorAlt code={formatCode(code)} language={language} />
        </div>
        <div className="flex shrink-0 w-[28vw] h-full">{mvc}</div>
      </div>
    </div>
  );
}
