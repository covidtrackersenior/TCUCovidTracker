import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Sticky from 'react-sticky-el';
import { News } from '../index';
const Infos = ( {nbdate,sname, snamestate} ) => (
    <div style={{ margin: '20px' }}>
      <Tabs>
        <TabList>
          <Tab>News</Tab>
        </TabList>
        <TabPanel>
          <p>
            <div className="scrollarea" style={{height: '500px', width: '400px', overflow: 'scroll'}}>
              <Sticky scrollElement=".scrollbar">
                <h1>
                  <News nbdate={nbdate} sname={sname} />
                </h1>
              </Sticky>
            </div>
          </p>
        </TabPanel>
      </Tabs>
    </div>
);
export default Infos;