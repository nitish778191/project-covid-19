#include<bits/stdc++.h>
using namespace std;

int main()
{
    
int n,k;
cin>>n>>k;
int t=240-k;
int q=0;
for(int i=1;i<=n;i++)
{
    if(t>=5*i)
    {
        q++;

        t=t-5*i;
    }
    else
        break;

    

}

cout<<q;

}