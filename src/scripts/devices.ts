import * as THREE from 'three';
// @ts-ignore düz JS modülü
import { runDevices } from './devices-core.js';

export function initDevices(canvas: HTMLCanvasElement) {
  runDevices(THREE, canvas);
}
