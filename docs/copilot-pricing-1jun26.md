# Modelos y precios para GitHub Copilot

Consultar los precios por token de los modelos disponibles en GitHub Copilot y las tarifas de referencia para uso adicional en los planes.

## Funcionamiento de los precios del modelo

Cuando se usa Copilot, la interacción consume tokens: tokens de entrada (lo que se envía al modelo), tokens de salida (lo que genera el modelo) y tokens almacenados en caché (contexto que el modelo reutiliza o almacena). Cada token tiene un precio basado en el modelo usado y el total se convierte en AI credits, donde 1AI credit = $0.01 USD .

El costo de una interacción depende de dos cosas: el modelo y el número de tokens consumidos.

El Copilot seguimiento del uso y facturado depende del tipo de plan:

* Los planes individuales (Copilot gratis, Copilot Pro, Copilot Pro+y Copilot Max) incluyen GitHub AI Credits asignaciones que varían según el plan. Para obtener más información, consulte [Facturación basada en el uso para individuos](/es/copilot/concepts/billing/usage-based-billing-for-individuals).
* Copilot Business e Copilot Enterprise incluyen asignaciones por usuario GitHub AI Credits agrupadas en el nivel de entidad de facturación. Para obtener más información, consulte [Facturación basada en el uso para organizaciones y empresas](/es/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises).

Cuando el uso supera las asignaciones incluidas para cualquier Copilot plan, el uso adicional se factura según GitHub AI Credits las tarifas por token que se muestran en las tablas de precios siguientes (1 AI credit = $0.01 USD).

> \[!NOTE] La opción de comprar AI credits adicional no está disponible si se suscribe o se ha suscrito a un plan de Copilot a través de GitHub Mobile en iOS o Android.

## Tablas de precios

Todos los precios son **por 1 millón de tokens**.

### OpenAI

| Modelo         | Estado de lanzamiento | Categoría   | Entrada | Entrada almacenada en caché | Salida |
| -------------- | --------------------- | ----------- | ------: | --------------------------: | -----: |
|                |                       |             |         |                             |        |
| GPT-4.1[^1]    | GA                    | Versatile   |   $2.00 |                       $0.50 |  $8.00 |
|                |                       |             |         |                             |        |
| GPT-5 mini[^1] | GA                    | Lightweight |   $0.25 |                      $0.025 |  $2.00 |
|                |                       |             |         |                             |        |
| GPT-5.2        | GA                    | Versatile   |   $1.75 |                      $0.175 | $14.00 |
|                |                       |             |         |                             |        |
| GPT-5.2-Codex  | GA                    | Powerful    |   $1.75 |                      $0.175 | $14.00 |
|                |                       |             |         |                             |        |
| GPT-5.3-Codex  | GA                    | Powerful    |   $1.75 |                      $0.175 | $14.00 |
|                |                       |             |         |                             |        |
| GPT-5.4[^2]    | GA                    | Versatile   |   $2.50 |                       $0.25 | $15.00 |
|                |                       |             |         |                             |        |
| GPT-5.4 mini   | GA                    | Lightweight |   $0.75 |                      $0.075 |  $4.50 |
|                |                       |             |         |                             |        |
| GPT-5.4 nano   | GA                    | Lightweight |   $0.20 |                       $0.02 |  $1.25 |
|                |                       |             |         |                             |        |
| GPT-5.5        | GA                    | Powerful    |   $5.00 |                       $0.50 | $30.00 |
|                |                       |             |         |                             |        |

[^1]: GPT-4.1 and GPT-5 mini are included models.

[^2]: GPT-5.4 pricing applies to prompts with ≤272K tokens.

### Anthropic

Los modelos Anthropic incluyen un costo de escritura en caché además de la entrada en caché.

| Modelo            | Estado de lanzamiento | Categoría | Entrada | Entrada almacenada en caché | Escritura en caché | Salida |
| ----------------- | --------------------- | --------- | ------: | --------------------------: | -----------------: | -----: |
|                   |                       |           |         |                             |                    |        |
| Claude Haiku 4.5  | GA                    | Versatile |   $1.00 |                       $0.10 |              $1.25 |  $5.00 |
|                   |                       |           |         |                             |                    |        |
| Claude Sonnet 4   | GA                    | Versatile |   $3.00 |                       $0.30 |              $3.75 | $15.00 |
|                   |                       |           |         |                             |                    |        |
| Claude Sonnet 4.5 | GA                    | Versatile |   $3.00 |                       $0.30 |              $3.75 | $15.00 |
|                   |                       |           |         |                             |                    |        |
| Claude Sonnet 4.6 | GA                    | Versatile |   $3.00 |                       $0.30 |              $3.75 | $15.00 |
|                   |                       |           |         |                             |                    |        |
| Claude Opus 4.5   | GA                    | Powerful  |   $5.00 |                       $0.50 |              $6.25 | $25.00 |
|                   |                       |           |         |                             |                    |        |
| Claude Opus 4.6   | GA                    | Powerful  |   $5.00 |                       $0.50 |              $6.25 | $25.00 |
|                   |                       |           |         |                             |                    |        |
| Claude Opus 4.7   | GA                    | Powerful  |   $5.00 |                       $0.50 |              $6.25 | $25.00 |
|                   |                       |           |         |                             |                    |        |
| Claude Opus 4.8   | GA                    | Powerful  |   $5.00 |                       $0.50 |              $6.25 | $25.00 |
|                   |                       |           |         |                             |                    |        |

### Google

| Modelo             | Estado de lanzamiento | Categoría   | Entrada | Entrada almacenada en caché | Salida |
| ------------------ | --------------------- | ----------- | ------: | --------------------------: | -----: |
|                    |                       |             |         |                             |        |
| Gemini 2.5 Pro[^5] | GA                    | Powerful    |   $1.25 |                      $0.125 | $10.00 |
|                    |                       |             |         |                             |        |
| Gemini 3 Flash[^6] | Public preview        | Lightweight |   $0.50 |                       $0.05 |  $3.00 |
|                    |                       |             |         |                             |        |
| Gemini 3.1 Pro[^5] | Public preview        | Powerful    |   $2.00 |                       $0.20 | $12.00 |
|                    |                       |             |         |                             |        |
| Gemini 3.5 Flash   | GA                    | Lightweight |   $1.50 |                       $0.15 |  $9.00 |
|                    |                       |             |         |                             |        |

[^5]: Géminis 2.5 Pro and Géminis 3.1 Pro pricing applies to prompts with ≤200K tokens.

[^6]: Géminis 3 Flash has no long-context surcharge.

### Ajustado con precisión (GitHub)

| Modelo          | Estado de lanzamiento | Categoría | Entrada | Entrada almacenada en caché | Salida |
| --------------- | --------------------- | --------- | ------: | --------------------------: | -----: |
|                 |                       |           |         |                             |        |
| Raptor mini[^7] | Public preview        | Versatile |   $0.25 |                      $0.025 |  $2.00 |
|                 |                       |           |         |                             |        |

[^7]: Raptor Mini uses GPT-5 mini pricing.

## Finalizaciones de código

Las finalizaciones de código y sugerencias de edición siguientes no se facturan en AI credits. Siguen siendo ilimitados para todos los planes de pago Copilot y siguen usando su mecanismo de recuento existente.

## Consideraciones sobre los precios y los costos de uso para revisión de código Copilot

Para la mayoría Copilot de las características, el modelo usado para cada interacción es visible para usted, por lo que puede hacer referencia a las tablas de precios anteriores para calcular los costos.
revisión de código Copilot es una excepción: el modelo se selecciona automáticamente y no se divulga, por lo que los costos por token pueden variar entre revisiones.

Cada revisión de código se factura de dos maneras: el consumo de tokens se factura en AI creditsy la infraestructura agente que impulsa la revisión consume GitHub Actions minutos.

GitHub Actions los minutos se atribuyen al repositorio y, a partir de ahí, a la empresa o al centro de costes, si procede.
AI credits se le cobran a la persona que solicita la revisión o al autor de una solicitud de incorporación de cambios en la que una política activa automáticamente una revisión. Si ninguno tiene asiento Copilot , el uso se factura a la empresa o al centro de costos en su lugar.

Puede ver el uso actual de GitHub Actions para revisión de código Copilot de las siguientes maneras:

* **GitHub Actions métricas**: filtrar por el flujo de `copilot-pull-request-reviewer` trabajo. Consulte [Visualización de las métricas de GitHub Actions para tu organización](/es/organizations/collaborating-with-groups-in-organizations/viewing-github-actions-metrics-for-your-organization).
* **Informe de uso de facturación**: filtrar por `workflow_path` usando el valor `dynamic/agents/copilot-pull-request-reviewer`. Consulte [Referencia de informes de facturación](/es/billing/reference/billing-reports).

## Multiplicadores de modelos para Copilot Pro y Copilot Pro+ suscriptores anuales

Copilot Pro y Copilot Pro+ los suscriptores de **los planes de facturación anuales existentes** mediante el modelo de **facturación basado en solicitudes** tienen multiplicadores de modelos diferentes. Consulte [Multiplicadores por modelo para planes anuales con facturación basada en solicitudes (heredada)](/es/copilot/reference/copilot-billing/model-multipliers-for-annual-plans).
