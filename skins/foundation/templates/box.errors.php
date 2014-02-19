{if isset($GUI_MESSAGE.error)}
<div data-alert class="alert-box warning">
   {$LANG.gui_message.errors_detected}
   <ul>
      {foreach from=$GUI_MESSAGE.error item=error}
      <li>{$error}</li>
      {/foreach}
   </ul>
   <a href="#" class="close"><i class="fa fa-times-circle"></i></a>
</div>
{/if}
{if isset($GUI_MESSAGE.notice)}
<div data-alert class="alert-box info">
   {foreach from=$GUI_MESSAGE.notice item=notice}
   <div>{$notice}</div>
   {/foreach}
   <a href="#" class="close"><i class="fa fa-times-circle"></i></a>
</div>
{/if}