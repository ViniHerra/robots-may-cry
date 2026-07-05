Title: Por qué un brazo robótico no sabe que está soldando
Date: 2026-06-10
Category: Control
Tags: actuadores, control, percepción
Slug: brazo-robotico-soldadura
Summary: Un brazo industrial puede repetir el mismo movimiento un millón de veces con precisión de micras. Lo que no puede hacer es darse cuenta de que algo salió mal — a menos que alguien le haya enseñado exactamente qué buscar.

Un brazo industrial puede repetir el mismo movimiento un millón de veces
con precisión de micras. Lo que no puede hacer, salvo que alguien lo haya
programado explícitamente para ello, es darse cuenta de que algo salió mal.

## El problema de la propiocepción artificial

Los humanos sabemos, sin mirar, si una articulación se movió más de lo
esperado. Eso es propiocepción: sensores internos que reportan posición y
fuerza sin depender de la vista. Un robot solo tiene la propiocepción que
le compremos: encoders, galgas extensométricas, sensores de torque.

Cuando esos sensores faltan o son baratos, el robot opera a ciegas dentro
de su propio cuerpo.

## Closed loop vs open loop

> Un sistema en lazo abierto ejecuta el plan. Un sistema en lazo cerrado
> compara el resultado contra el plan y corrige.

Esta distinción explica buena parte de por qué la automatización
industrial es más difícil de lo que parece desde afuera.
