@live-session-cross-promo-tab @live-page @future-requirement
Feature: Live Session Cross Promo Tab

As a Live audience member
I want a tab on tablet and mobile devices to indicate there are more Live Sessions available
So that I can discover other sessions the BBC has to offer

+ IT should have a tab title of "More Live".
+ IT should be the third tab after the tab labelled "Data"
+ IT should only be displayed if the "Live Page Cross Promo" module is present.
+ IT should only display the tab on resolutions less than 899px (tablet & mobile).
+ IT should NOT display if the "related_sessions" flagpole is turned off.
+ IT should NOT display the tab on fallback devices/browsers.
- VISUAL - TBC
- JIRA: LIVESCHEDULE-1339