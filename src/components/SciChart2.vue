<template>
  <div style="width: 100%; margin: auto">
    <div id="channel-LEAD1">1</div>
    <div id="channel-LEAD2">2</div>
    <div id="channel-LEAD3">3</div>
    <div id="channel-aVR">4</div>
    <div id="channel-aVL">5</div>
    <div id="channel-aVF">6</div>
  </div>
</template>

<script lang="ts">
import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { SciChartJSDarkTheme } from "scichart/Charting/Themes/SciChartJSDarkTheme";
async function channels(){
  SciChartSurface.setRuntimeLicenseKey(
    "5ycxvf/fY4gXbo/ejlWy2JzrxfwiO3XxnN4QB5l327kqZNnGd+hs1lHuSmi2+TDeenf0kGGDk6rpjYWwpLJipt6qTvMzRx6zlZhY9Qyo+DYNuNieYzxrC/ZceJwv7E/2UdlYysxQLHMDEcp0txtbjJ++qVe4gjU1bgU8+mz92RzB7rZhonqZ6pCZyLYgONZ8ljZicebuSlOM0KQSeomou30SIE1S9wiP6W9YuuaIoCR/gZIwMZnioOHf8k3gsPB3EfCH0D/Mz+/eUq9RliOJkSm66r13+XgaDRp/fG9UAF2xoZmXSqzBX1v52A2Xn7NuXyxmOiQVRvIfuF7qW6e7XIZqHed6ZJ+rp9xXMs+q1JlF39LmZsMqChi0HuAM8eohJhRJ0dspyTAFH9aot6nBJCi1DmKu0DXumyXm9IdEOlXCWa5whtWDwoUnvkuKrI1KRDVZ1KjsDoZ+Pvw+7oX0+ERCeMeUrpgx0XhDFe8jzQB33hmiAu23FJ4OIike6RGYlWk5VczgpY+NXSVj5tjM0b0JiF/mFGjoFKsQ3noKqAHyosPrfhtGH830MYD44ObNWuvLWeLxNofC4a5odOwPFHvwDVVlNTAo9UFw2g3p7pF9WAsup7+YV7cjooMQPqrMD4GBSggeh+k26nQyc9nAT0qiceMSScuHENhbc+j8UFI0RZuP1x5d6xkJJ1A8TtJ41KDqxML8QrV/KijPP+y5iAxIOCexrjGlPTCTdUhTpw=="
  );

  // channel-LEAD1
  const channel_LEAD1 = async () => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
      "channel-LEAD1",
      900,
      400
    );
    sciChartSurface.applyTheme(new SciChartJSDarkTheme());
  };

  // channel-LEAD2
  const channel_LEAD2 = async () => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
      "channel-LEAD2",
      900,
      400
    );
    sciChartSurface.applyTheme(new SciChartJSDarkTheme());
  };

  // channel-LEAD3
  const channel_LEAD3 = async () => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
      "channel-LEAD3",
      900,
      400
    );
    sciChartSurface.applyTheme(new SciChartJSDarkTheme());
  };

  // channel-aVR
  const channel_aVR = async () => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
      "channel-aVR",
      900,
      400
    );
    sciChartSurface.applyTheme(new SciChartJSDarkTheme());
  };

  // channel-aVL
  const channel_aVL = async () => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
      "channel-aVL",
      900,
      400
    );
    sciChartSurface.applyTheme(new SciChartJSDarkTheme());
    
  };

  // channel-aVF
  const channel_aVF = async () => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
      "channel-aVF",
      900,
      400
    );
    sciChartSurface.applyTheme(new SciChartJSDarkTheme());
  };
}
</script>
