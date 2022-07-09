'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">templater documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-c8724e2c00653803ec2163abace509b2d7e9846fee1b8fb3f243e98804103401f6f599be4d08aaba52bbe75396b9dc0ab68366c47b563afe02d74a17d2c155db"' : 'data-target="#xs-controllers-links-module-AppModule-c8724e2c00653803ec2163abace509b2d7e9846fee1b8fb3f243e98804103401f6f599be4d08aaba52bbe75396b9dc0ab68366c47b563afe02d74a17d2c155db"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-c8724e2c00653803ec2163abace509b2d7e9846fee1b8fb3f243e98804103401f6f599be4d08aaba52bbe75396b9dc0ab68366c47b563afe02d74a17d2c155db"' :
                                            'id="xs-controllers-links-module-AppModule-c8724e2c00653803ec2163abace509b2d7e9846fee1b8fb3f243e98804103401f6f599be4d08aaba52bbe75396b9dc0ab68366c47b563afe02d74a17d2c155db"' }>
                                            <li class="link">
                                                <a href="controllers/I18nController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >I18nController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/LambdaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LambdaController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TemplateController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TransformerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransformerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-c8724e2c00653803ec2163abace509b2d7e9846fee1b8fb3f243e98804103401f6f599be4d08aaba52bbe75396b9dc0ab68366c47b563afe02d74a17d2c155db"' : 'data-target="#xs-injectables-links-module-AppModule-c8724e2c00653803ec2163abace509b2d7e9846fee1b8fb3f243e98804103401f6f599be4d08aaba52bbe75396b9dc0ab68366c47b563afe02d74a17d2c155db"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c8724e2c00653803ec2163abace509b2d7e9846fee1b8fb3f243e98804103401f6f599be4d08aaba52bbe75396b9dc0ab68366c47b563afe02d74a17d2c155db"' :
                                        'id="xs-injectables-links-module-AppModule-c8724e2c00653803ec2163abace509b2d7e9846fee1b8fb3f243e98804103401f6f599be4d08aaba52bbe75396b9dc0ab68366c47b563afe02d74a17d2c155db"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuditService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuditService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EjsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EjsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JinjaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JinjaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JsTLService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JsTLService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TransformerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransformerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VMService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VMService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RPCModule.html" data-type="entity-link" >RPCModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RPCModule-bb1eda5a906b1d0c897f5aaafad7b563b3b30aff8dbcde5e7d9d05fe366a8cfb41dd0f824fc13a71aaddeb703a0e397d12067fb73da28f73c17a4950182657ab"' : 'data-target="#xs-controllers-links-module-RPCModule-bb1eda5a906b1d0c897f5aaafad7b563b3b30aff8dbcde5e7d9d05fe366a8cfb41dd0f824fc13a71aaddeb703a0e397d12067fb73da28f73c17a4950182657ab"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RPCModule-bb1eda5a906b1d0c897f5aaafad7b563b3b30aff8dbcde5e7d9d05fe366a8cfb41dd0f824fc13a71aaddeb703a0e397d12067fb73da28f73c17a4950182657ab"' :
                                            'id="xs-controllers-links-module-RPCModule-bb1eda5a906b1d0c897f5aaafad7b563b3b30aff8dbcde5e7d9d05fe366a8cfb41dd0f824fc13a71aaddeb703a0e397d12067fb73da28f73c17a4950182657ab"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SingletonServiceModule.html" data-type="entity-link" >SingletonServiceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SingletonServiceModule-7b691a55d89d71a35f78b28f5369dae7801fa00ce8c7dc2a1a3f089932d15cce1390de5d7284d3f282a0dfad36f850665ef90411be9ab5f533c5061d16411ba7"' : 'data-target="#xs-injectables-links-module-SingletonServiceModule-7b691a55d89d71a35f78b28f5369dae7801fa00ce8c7dc2a1a3f089932d15cce1390de5d7284d3f282a0dfad36f850665ef90411be9ab5f533c5061d16411ba7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SingletonServiceModule-7b691a55d89d71a35f78b28f5369dae7801fa00ce8c7dc2a1a3f089932d15cce1390de5d7284d3f282a0dfad36f850665ef90411be9ab5f533c5061d16411ba7"' :
                                        'id="xs-injectables-links-module-SingletonServiceModule-7b691a55d89d71a35f78b28f5369dae7801fa00ce8c7dc2a1a3f089932d15cce1390de5d7284d3f282a0dfad36f850665ef90411be9ab5f533c5061d16411ba7"' }>
                                        <li class="link">
                                            <a href="injectables/VMService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VMService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JsTLService.html" data-type="entity-link" >JsTLService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/RenderDto.html" data-type="entity-link" >RenderDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RenderDtoTest.html" data-type="entity-link" >RenderDtoTest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RenderResponse.html" data-type="entity-link" >RenderResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RunFeedback.html" data-type="entity-link" >RunFeedback</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SampleData.html" data-type="entity-link" >SampleData</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});